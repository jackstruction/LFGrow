const { ethers } = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const sample = {
    address: "0xAddress",
    abi: [
        "function moreLikeBabi() view returns (string)",
        "function moreofThatNonsense() external",
        "function thisHasInput(address _owner) public view returns (uint256 balance)",
    ],
};

async function main() {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    document.getElementById("connect").innerText = userAddress;

    const sampleContract = new ethers.Contract(sample.address, sample.abi, signer);

    let sampleInput = await sampleContract.thisHasInput(userAddress);
    sampleInput = ethers.utils.formatUnits(sampleInput, 6);
    document.getElementById("balance").innerText = sampleInput;
}
main();