
export class LongTxt extends React.Component {

    state = {
        isLongTxtShown: false,
        txtLimit: 100
    }

    toggleLongTxt = () => {
        this.setState((prevState) => ({ isLongTextShown: !prevState.isLongTextShown }))
    }

    render() {
        const { txt } = this.props
        const { isLongTextShown, txtLimit } = this.state

        // No long text required
        if (txt.length <= txtLimit) {
            return <p>{txt}</p>
        }

        // read more button
        if (!isLongTextShown) {
            const toShow = txt.substring(0, txtLimit)
            return <p>
                {toShow}
                <span className="toggle-long-txt" onClick={this.toggleLongTxt}> read more▾</span>
            </p>
        }


        return <p>
            {txt}
        </p>
    }
}