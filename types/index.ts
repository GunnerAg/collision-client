// Processed metric data for the UI
export interface Metrics {
  walletsDerived: number;
  collisions: number;
  ethFound: number;
  uptime: string;
}

// Processed wallet data for the UI
export interface WalletInfo {
  coin: string;
  path: string;
  address: string;
  privateKey: string;
  balance: number;
  seedHash: string;
  txHash: string | null;
  timestamp: number;
}

// Raw metric data structure from WebSocket
export interface RawMetricsSnapshot {
    total_wallets_derived: number;
    total_collisions: number;
    total_eth_found: number;
    total_time_up_seconds: number;
}

// Raw wallet data structure from WebSocket
export interface RawWalletData {
    coin: string;
    path: string;
    address: string;
    private_key: string;
    balance_eth: number;
    seed_hash_sha256: string;
    tx_hash: string | null;
    timestamp: number;
}

// Type for the metrics message wrapper from WebSocket
export interface MetricsMessage {
    type: 'metrics_snapshot';
    data: RawMetricsSnapshot;
}
