
export class LongTxt extends React.Component {

    state = {
        txtLimit: 300
    }

    render() {
        const { txt, title, isTodo } = this.props
        let { txtLimit } = this.state
        if (txt) {
            txtLimit = isTodo ? 30 : 300
            if (txt.length <= txtLimit) {
                return txt
            } else {
                const toShow = txt.substring(0, txtLimit)
                return toShow + '...'
            }
        }

        if (title) {
            if (title.length <= txtLimit - 250) {
                return <h4>{title}</h4>
            } else {
                const toShow = title.substring(0, txtLimit - 250)
                return <h4>
                    {toShow + '...'}
                </h4>
            }
        }
    }
}
