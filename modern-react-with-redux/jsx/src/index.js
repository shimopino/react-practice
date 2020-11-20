// import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

const App = () =>  {
    const buttonText = 'Click Me!';

    return (
        <div>
            {/* 以下の属性指定が間違っていた */}
            {/* classはJSのclass，forはJSのforと混同してしまう */}
            <label className="label" htmlFor="name">
                Enter name:
            </label>
            <input id="name" type="text" />
            <button style={{ backgroundColor: 'blue', color: 'white' }}>
                {buttonText}
            </button>
        </div>
    );
};

// Take react compoenent and show it on the screen
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);