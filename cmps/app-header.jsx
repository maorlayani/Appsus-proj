const { Link, NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {
  state = {
    isShowHeaderDropdown: false
  }

  showHeaderDropDown = () => {
    this.setState((prevState) => ({ isShowHeaderDropdown: !prevState.isShowHeaderDropdown }))
  }

  render() {
    // console.log(this.props)
    const { isShowHeaderDropdown } = this.state
    const { showHeaderDropDown } = this
    const { location } = this.props
    // console.log(location)
    return (
      <header className="app-header">
        <Link to={"/" + (location.pathname === '/note' ? 'note' : '')}>
          {location.pathname !== '/note' && <h3>APPSUS</h3>}
          {location.pathname === '/note' && <div className="keep keep-app"><span>Keep</span></div>}
        </Link>
        <nav>
          <div className="drop-down" onClick={showHeaderDropDown}></div>
          <div className={"drop-down-content " + (isShowHeaderDropdown ? 'show' : '')}>
            <NavLink to="/note" onClick={showHeaderDropDown}>
              <div className="keep-container">
                <div className="keep"></div>
                <div className="keep-title">Keep</div>
              </div>
            </NavLink>
            <NavLink to="/mail" onClick={showHeaderDropDown}>
              <div className="mail-container">
                <div className="mail"></div>
                <div className="mail-title">Mail</div>
              </div>
            </NavLink>
            <NavLink exact to="/" onClick={showHeaderDropDown}>
              <div className="home-container">
                <div className="home"></div>
                <div className="home-title">Home</div>
              </div>
            </NavLink>
            <NavLink to="/about" onClick={showHeaderDropDown}>
              <div className="about-container">
                <div className="about"></div>
                <div className="about-title">About</div>
              </div>
            </NavLink>
          </div>
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)
