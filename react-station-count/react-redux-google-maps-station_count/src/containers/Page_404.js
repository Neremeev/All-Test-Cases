import React from 'react';
import {Link} from 'react-router-dom'


export default function App() {
    return (
        <div>
            СТРАНИЦА В РАЗРАБОТКЕ
            <p>
                <button>
                    <Link to={`/`}>Вернуться назад</Link>
                </button>
            </p>
        </div>
    );
}
