import { useState, useEffect, useRef } from 'react';
// Asegúrate de que 'types' contiene las definiciones de WalletInfo, Metrics, RawWalletData, y MetricsMessage
import { WalletInfo, Metrics, RawWalletData, MetricsMessage } from '../types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://fallback.ws.url/ws';
const WALLET_BUFFER_DELAY = process.env.NEXT_PUBLIC_WS_WALLET_BUFFER_DELAY || '100';

// --- Funciones Auxiliares ---
const formatUptime = (seconds: number): string => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
};

const isMetricsMessage = (msg: MetricsMessage): msg is MetricsMessage => {
  return msg.type === 'metrics_snapshot' && msg.data !== undefined;
};

// --- Hook Principal ---
export const useWebSocketFeed = () => {
  // 1. ESTADO INICIAL COMPLETO (previene el TypeError en el primer render)
  const [metrics, setMetrics] = useState<Metrics>({
    walletsDerived: 0,
    collisions: 0,
    ethFound: 0,
    uptime: '0d 0h 0m 0s',
  });
  const [wallets, setWallets] = useState<WalletInfo[]>([]);

  // 2. Referencias para el Buffer de Wallets (Optimización de Rendimiento)
  const walletBufferRef = useRef<WalletInfo[]>([]);
  // Usamos 'number | null' para tipar el ID del timer
  const bufferTimerRef = useRef<number | null>(null);

  /**
   * Procesa el buffer acumulado de wallets y actualiza el estado de React una vez.
   */
  const processWalletBuffer = () => {
    // Si no hay nada en el buffer, salir
    if (walletBufferRef.current.length === 0) return;

    const newWallets = walletBufferRef.current;
    walletBufferRef.current = []; // Limpiar el buffer para la próxima ráfaga

    // Actualizar el estado de React con el lote de wallets
    setWallets(prevWallets => {
      // Concatenar el nuevo lote (al inicio) y aplicar el límite de 100
      const updatedWallets = [...newWallets, ...prevWallets];
      // Mantenemos solo los 100 más recientes
      return updatedWallets.slice(0, 100);
    });
  };

  useEffect(() => {
    // CAMBIO CLAVE: Utilizamos la constante WS_URL que ya lee la variable de entorno
    const socket = new WebSocket(WS_URL);
    console.log('sokcet', socket) // Mantenemos este log para debugging

    socket.onopen = () => console.log('[WS] Connection established');
    socket.onclose = () => console.log('[WS] Connection closed');
    socket.onerror = (error) => console.error('[WS] Error:', error);

    // ... (El resto de la lógica onmessage se mantiene igual)
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (isMetricsMessage(message)) {
          // Actualización directa de Métricas
          const data = message.data;
          setMetrics({
            walletsDerived: data.total_wallets_derived,
            collisions: data.total_collisions,
            ethFound: data.total_eth_found,
            uptime: formatUptime(data.total_time_up_seconds),
          });
        } else {
          // Lógica del Buffer para Wallets
          const data: RawWalletData = message;
          const newWallet: WalletInfo = {
            coin: data.coin,
            path: data.path,
            address: data.address,
            privateKey: data.private_key,
            balance: data.balance_eth,
            seedHash: data.seed_hash_sha256,
            txHash: data.tx_hash,
            timestamp: data.timestamp,
          };

          // 1. Añadir al buffer
          walletBufferRef.current.push(newWallet);

          // 2. Si no hay un timer activo, iniciar uno para procesar el lote
          if (!bufferTimerRef.current) {
            // Usamos window.setTimeout para obtener el tipo correcto de retorno
            bufferTimerRef.current = window.setTimeout(() => {
              processWalletBuffer();
              bufferTimerRef.current = null; // Resetear el timer después de procesar
            }, parseInt(WALLET_BUFFER_DELAY)) as unknown as number;
          }
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', event.data, error);
      }
    };

    // --- Cleanup de useEffect (Evita fugas de memoria) ---
    return () => {
      socket.close();
      if (bufferTimerRef.current) {
        clearTimeout(bufferTimerRef.current);
        bufferTimerRef.current = null;
      }
      walletBufferRef.current = [];
    };
  }, []);

  return { metrics, wallets };
};