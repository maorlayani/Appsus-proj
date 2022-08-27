export class Home extends React.Component {

    onStart = () => {
        let goTo = Math.random() > 0.5 ? 'note' : 'mail'
        this.props.history.push(`/${goTo}`)
    }

    render() {

        return <section className="home-page flex column align-center">
            <div className="hero-txt">GATHER ALL YOUR IDEAS & MAILS IN ONE PLACE</div>
            <button className="home-btn" onClick={this.onStart}>START EXPLORING</button>
        </section>
    }
}