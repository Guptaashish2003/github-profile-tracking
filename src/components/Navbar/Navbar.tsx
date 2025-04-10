import reachFast from "@/assets/reachFast.png";

const Navbar = () => {
  return (
    <nav className="w-1/3 mx-auto backdrop-blur-3xl bg-white/20 h-12 rounded-3xl shadow-lg mt-4 ">
      
        <ul className="flex justify-between items-center h-12 text-white  rounded-lg px-10 ">
          <li >
            <a href="/" className="menuHover">Home</a>
          </li>
          <li>
            <a href="/about" className="menuHover">About</a>
          </li>
          <li>
          <a href="/">  <img src={reachFast} alt="logo" className="w-10 h-10 mix-blend-multiply cursor-pointer p-1"  /></a>
          </li>
          <li>
            <a href="/careers" className="menuHover">Careers</a>
          </li>
          <li>
            <a href="/contacts" className="menuHover">Contacts</a>
          </li>
        </ul>   
    </nav>
  );
};

export default Navbar;