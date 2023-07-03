import React, { useEffect, useRef, useState } from "react";
import s from "./SelectForInput.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const SelectForInput = (props) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

    //// Альтернативный вариант проверки нажатия, с такой проверкой событие удаляется после того как срабатывает, однако
    //// если добавлять и удалять событие с помощью метода addClickOutside, ClickOutside сработает столько раз, сколько
    //// подряд закрыли и открыли селект
    // const ClickOutside = (event) => {
    //     if (itemRef.current && !itemRef.current.contains(event.target)) {
    //         setIsActive(false);
    //         console.log("The 'item' div is not clicked.");
    //         document.removeEventListener('mousedown', ClickOutside);
    //         console.log('ClickOutside__removeEventListener');
    //     }
    // };
    //
    // const addClickOutside = () =>{
    //     if (!isActive){
    //         setIsActive(true)
    //         document.addEventListener("mousedown", ClickOutside);
    //         console.log('addEventListener');
    //     }
    //     else{
    //         setIsActive(!isActive)
    //         console.log('removeEventListener');
    //     }
    // }

    const changeValueFrom = (from) =>{
        if (parseInt(props.value.before) >= parseInt(from) || !from){
            props.setValue({ ...props.value, from: from })
        }
    }

    const changeValueBefore = (before) =>{
        console.log(props.value.from);
        console.log(parseInt(before));
        if (parseInt(props.value.from) <= parseInt(before) || !props.value.from){
            props.setValue({ ...props.value, before: before })
        }
    }

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.container} ref={itemRef}>
      <div
        className={`${s.activation__button} ${
          isActive ? s.button__is__activated : ""
        }
              ${
                props.isThemeLight
                  ? s.activation__button__light
                  : s.activation__button__dark
              }`}
        onClick={() => setIsActive(!isActive)}
      >
        <span>Created</span>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`${s.open} ${props.isThemeLight ? s.open__light : s.open__dark}`}
        />
      </div>
      {isActive ? (
        <div
          className={`${s.content} ${
            props.isThemeLight ? s.content__light : s.content__dark
          }`}
        >
          <input
            className={`${s.input} ${
              props.isThemeLight ? s.input__light : s.input__dark
            }`}
            placeholder="from"
            type="number"
            value={props.value.from}
            onChange={(event) => changeValueFrom(event.target.value)
            }
          />
          —
          <input
            className={`${s.input} ${
              props.isThemeLight ? s.input__light : s.input__dark
            }`}
            placeholder="before"
            type="number"
            value={props.value.before}
            onChange={(event) => changeValueBefore(event.target.value)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectForInput;
