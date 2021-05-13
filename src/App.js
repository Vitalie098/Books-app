import React, {useState} from "react"
import './App.css';

import Listbooks from "./data/books";
import { Image, ListGroup, ListGroupItem} from "react-bootstrap";


function App() {

    const [books, setBooks] = useState(Listbooks)


    const onMoveUp = idx => {
        const booksCopy = [...books]
        const bookUp = booksCopy[idx]

        for (let i = idx; i < booksCopy.length - 1; i++) {
            booksCopy[i] = booksCopy[i + 1]
        }

        booksCopy[books.length - 1] = bookUp
        setBooks(booksCopy)

    }

    const onMoveDown = idx => {
        const booksCopy = [...books]
        const bookDown = booksCopy[idx]

        for (let i = idx; i > 0; i--) {
            booksCopy[i] = booksCopy[i - 1]
        }
        booksCopy[0] = bookDown
        setBooks(booksCopy)
    }

    const deleteItem = (e, id) => {
        e.preventDefault()
        let booksCopy = [...books]
        booksCopy = booksCopy.filter(i => i.id !== id)

        setBooks(booksCopy)
    }

    const changeTitleHandler = (e, id) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            openInput(id)
            return
        }

        let booksCopy = [...books]
        const idx = booksCopy.findIndex(b => b.id === id)
        booksCopy[idx].title = e.target.value

        setBooks(booksCopy)

    }

    const openInput = id => {
        let booksCopy = [...books]
        const idx = booksCopy.findIndex(b => b.id === id)
        booksCopy[idx].edit = !booksCopy[idx].edit

        setBooks(booksCopy)
    }

    return (
        <div className="leaderboard">
            <header>
                <h1 className="leaderboard__title"><span className="leaderboard__title--top">Top Books</span>
                    <span className="leaderboard__title--bottom">The best in the 2021</span></h1>
            </header>
            {books.length === 0
                ? <h2 className="text-center p-3">List is empty</h2>
                : (
                    <ListGroup className="leaderboard__books">
                        {books.map((book, idx) => (
                                <ListGroupItem
                                    key={book.id}
                                    className="leaderboard__book"
                                    style={{display: "grid"}}
                                    onDoubleClick={() => onMoveDown(idx)}
                                    onContextMenu={e => deleteItem(e, book.id)}
                                >
                                    <Image
                                        alt={book.title}
                                        src={book.src}
                                        className="leaderboard__picture"
                                    />
                                    <span className="leaderboard__name">{book.title}</span>
                                    <span className="leaderboard__value">
                                        <i className="fa fa-arrow-down" onClick={() => onMoveUp(idx)} /> {"  "}
                                        <i className="fas fa-edit" onClick={() => openInput(book.id) }/> </span>
                                    {book.edit && (<input
                                        className="editTitle"
                                        placeholder={book.title}
                                        onChange={e => changeTitleHandler(e, book.id)}
                                        onKeyUp = {e => changeTitleHandler(e, book.id)}
                                    />)}
                                </ListGroupItem>
                            )
                        )}
                    </ListGroup>
                )}
        </div>
    );
}
export default App;
