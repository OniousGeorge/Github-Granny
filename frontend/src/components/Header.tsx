
import logo from '../assets/a-happy-cartoon-grandma-standing-and-smiling-HP9GC5.jpg';

interface HeaderProps {
    projectName: string;
    tagline: string;
}

function Header({ projectName, tagline } : HeaderProps) {
    return (
       <div className="githubGranny">
      <img className="githubGranny-logo" src={logo} alt="Github Granny logo" />
      <header>
        {projectName}
      </header>
      <h2>{tagline}</h2>
    </div>
    );
}

export default Header;