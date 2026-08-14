
interface HeaderProps {
    projectName: string;
    tagline: string;
}

function Header({ projectName, tagline } : HeaderProps) {
    return (
       <div className="githubGranny">
      <header>
        {projectName}
      </header>
      <h2>{tagline}</h2>
    </div>
    );
}

export default Header;