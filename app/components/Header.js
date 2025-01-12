import { ethers } from "ethers"

function Header({ account,handleClick }) {

  return (
    <header>
      <p className="brand">fun.pump</p>
      {account ? (<button className="btn--fancy">[{account.slice(0, 6) + '...' + account.slice(38, 42)}]</button>
      ) : <button onClick={handleClick} className="btn--fancy">[connect]</button>}
    </header>
  );
}

export default Header;