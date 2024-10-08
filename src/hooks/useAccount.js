import { useSelector } from "react-redux";
import { useAptosWallet, useAptosAccountBalance } from "@razorlabs/wallet-kit";

// Import redux actions
import { storeAccount, storeAccountBalance, removeAccount } from "../actions";

// Import utils
import { aptosClient } from "../utils/aptos_client";
import React from "react";

export function useAccount() {
  const { account } = useAptosWallet();
  const { balance } = useAptosAccountBalance();
  const metadata = useSelector((state) => state.account);

  const signout = function () {
    removeAccount();
  };

  const handleLogin = () => {
    const btn = document.getElementById("connectWalletBtn");
    if (btn) btn.click();
  };

  const fundAccount = async () => {
    const transaction = await aptosClient().fundAccount({
      accountAddress: account.address,
      amount: 192_000_000,
    });

    return transaction;
  };

  const getAccountInfo = async () => {
    try {
      const result = await aptosClient().getAccountInfo({
        accountAddress: account.address,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const getAccountModules = async () => {
    try {
      const result = await aptosClient().getAccountModules({
        accountAddress: account.address,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const getAccountOwnedTokens = async () => {
    try {
      const result = await aptosClient().getAccountOwnedTokens({
        accountAddress: account.address,
      });
      return result;
    } catch (error) {
      return error;
    }
  };

  const getBalance = async () => {
    const resource = await aptosClient().getAccountResource({
      accountAddress: account.address,
      resourceType: "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
    });

    return resource;
  };

  const refreshBalance = function () {
    getBalance().then((resource) => {
      const value = parseInt(resource.coin.value) / 1e8;
      storeAccountBalance(value);
    });
  };

  React.useEffect(() => {
    if (balance) storeAccountBalance(Number(balance) / 1e8);
  }, [balance]);

  return {
    account,
    metadata,
    signout,
    refreshBalance,
    handleLogin,
    fundAccount,
    getAccountInfo,
    getAccountModules,
    getAccountOwnedTokens,
    getBalance,
  };
}
