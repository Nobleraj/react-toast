import { useEffect, useState } from 'react';
import Accordion from './components/Accordion';
import faqData from './data';
import './index.css';
import useNotification from './components/useNotification';
import Notes from './components/Notes';
function App() {
  const [notes, setNotes] = useState(faqData);
  const { NotificationCmp, triggerNotification } = useNotification('top-right');
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (localStorage.getItem('count')) {
      setCount(Number(localStorage.getItem('count')));
    }
  }, []);

  const memo = (fn) => {
    let res = {};
    return (...args) => {
      const arg = JSON.stringify(args);
      if (!res[arg]) {
        res[arg] = fn(...args);
      }
      return res[args];
    };
  };

  const debounce = (fn) => {
    let timer = null;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, 500);
    };
  };

  const clickHandler = () => {
    let myCount = count + 1;
    setCount(myCount);
    localStorage.setItem('count', myCount);
  };
  const myDebounceFn = debounce(clickHandler);
  const memorize = memo(myDebounceFn);
  const handler = () => {
    myDebounceFn();
  };
  const [menus, setMenu] = useState([
    'Cofee',
    'Tea',
    'Burger',
    'Lemon tea',
    'Cool drinks',
  ]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    alert(selectedMenu);
  };
  const changeHandler = (e) => {
    const value = e.target.value;
    let myMenu = [...selectedMenu];
    if (myMenu.includes(value)) {
      myMenu = myMenu.filter((val) => val !== value);
    } else {
      myMenu.push(value);
    }
    setSelectedMenu(myMenu);
  };
  return (
    <>
      <div className="card">
        <button onClick={handler}>count is {count}</button>

        <p>Menu</p>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          onSubmit={onSubmit}
        >
          {menus.map((itm, i) => {
            return (
              <label key={i}>
                <input type="checkbox" value={itm} onChange={changeHandler} />
                <>{itm}</>
              </label>
            );
          })}
          <button>Submit</button>
        </form>
        <div className="accordion">
          <Accordion>
            <Accordion.Title>Accordion Component</Accordion.Title>
            <Accordion.Wrapper>
              {faqData.map((itm, i) => {
                return (
                  <Accordion.Item key={i}>
                    <Accordion.ItemHeader>{itm.header}</Accordion.ItemHeader>
                    <Accordion.Body>{itm.body}</Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion.Wrapper>
          </Accordion>
        </div>

        <div>
          <p>Notification</p>
          {NotificationCmp}
          <button
            onClick={() => {
              triggerNotification({
                id: Date.now(),
                type: 'success',
                message: 'Success notification',
                duration: 3000,
              });
            }}
          >
            Toast success
          </button>
          <button
            onClick={() => {
              triggerNotification({
                id: Date.now(),
                type: 'error',
                message: 'Error notification',
                duration: 3000,
              });
            }}
          >
            Toast error
          </button>
          <button
            onClick={() => {
              triggerNotification({
                id: Date.now(),
                type: 'warning',
                message: 'Warning notification',
                duration: 3000,
              });
            }}
          >
            Toast warning
          </button>
          <button
            onClick={() => {
              triggerNotification({
                id: Date.now(),
                type: 'info',
                message: 'Info notification',
                duration: 3000,
              });
            }}
          >
            Toast info
          </button>
        </div>
        <div>
        <p>Drag and Drop</p>
        <Notes notes={notes} setNotes={(notes) => setNotes(notes)} />
      </div>
      </div>
    </>
  );
}

export default App;
