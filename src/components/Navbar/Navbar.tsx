import reachFast from "@/assets/reachFast.png";

const Navbar = () => {
  return (
    <nav className="min-lg:w-[38%] max-md:w-screen  mx-auto backdrop-blur-3xl bg-white/20 h-12 rounded-3xl shadow-lg mt-4  max-md:mr-1">
      
        <ul className="flex justify-between items-center h-12 text-white  rounded-lg px-10 ">
          <li >
            <a href="https://reachfast.ai/" className="menuHover">Home</a>
          </li>
          <li>
            <a href="https://reachfast.ai/about" className="menuHover">About</a>
          </li>
          <li>
          <a href="https://reachfast.ai/">  <img src={reachFast} alt="logo" className="w-10 h-10 mix-blend-multiply cursor-pointer p-1"  /></a>
          </li>
          <li>
            <a href="https://ashish.biyondbytes.com/" className="menuHover">PortFolio</a>
          </li>
          <li>
            <a href="/https://reachfast.ai/contact" className="menuHover">Contacts</a>
          </li>
        </ul>   
    </nav>
  );
};

export default Navbar;