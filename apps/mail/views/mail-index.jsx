import { MailFilter } from "../cmps/mail-filter.jsx";
import { MailFolderList } from "../cmps/mail-folder-list.jsx";
import { MailList } from "../cmps/mail-list.jsx";
import { MailTopNavbar } from "../cmps/mail-top-navbar.jsx";

export class MailIndex extends React.Component {
    render() {
        return (
            <div>
                <h1>mail app</h1>
                <MailFilter />
                <MailFolderList />
                <MailList />
                <MailTopNavbar />
            </div>
        )
    }
}
