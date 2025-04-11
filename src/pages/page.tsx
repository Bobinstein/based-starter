import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { TurboFactory } from "@ardrive/turbo-sdk/web";
import { useEffect, useState } from "react";

const WalletInfo = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
  });
  const [turboBalance, setTurboBalance] = useState<{
    controlledWinc: string;
    winc: string;
    effectiveBalance: string;
  }>({
    controlledWinc: "0",
    winc: "0",
    effectiveBalance: "0",
  });

  const turbo = TurboFactory.unauthenticated();

  useEffect(() => {
    const fetchTurboBalance = async () => {
      if (address) {
        try {
          const balance = await turbo.getBalance(address);
          setTurboBalance({
            controlledWinc: balance.controlledWinc,
            winc: balance.winc,
            effectiveBalance: balance.effectiveBalance,
          });
        } catch (error) {
          console.error("Error fetching Turbo balance:", error);
          setTurboBalance({
            controlledWinc: "Error",
            winc: "Error",
            effectiveBalance: "Error",
          });
        }
      }
    };

    fetchTurboBalance();
  }, [address]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 p-4">
        <ConnectButton />

        {isConnected && (
          <div className="mt-4 p-6 border rounded-lg shadow-sm bg-black">
            <p className="text-lg">
              <span className="font-semibold">Address: </span>
              {address
                ? `${address.slice(0, 6)}...${address.slice(-4)}`
                : "Not connected"}
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Balance: </span>
              {balanceData
                ? `${Number(balanceData?.formatted).toFixed(4)} ${
                    balanceData?.symbol
                  }`
                : "Loading..."}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-lg">
                <span className="font-semibold">Turbo Controlled Winc: </span>
                {turboBalance.controlledWinc}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Turbo Available Winc: </span>
                {turboBalance.winc}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Turbo Effective Balance: </span>
                {turboBalance.effectiveBalance}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
