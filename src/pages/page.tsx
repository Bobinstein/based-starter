import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <ConnectButton />
        
        {isConnected && (
          <div className="mt-4 p-6 border rounded-lg shadow-sm bg-black">
            <p className="text-lg">
              <span className="font-semibold">Address: </span>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Balance: </span>
              {balanceData ? `${Number(balanceData?.formatted).toFixed(4)} ${balanceData?.symbol}` : 'Loading...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;


