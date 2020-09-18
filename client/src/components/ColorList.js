import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/useApi";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const newColorState = {
  color: "",
  code: { hex: ""}
}

const ColorList = ({ colors, updateColors, getData }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(newColorState)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      setEditing(false)
      getData()
      })
    .catch(err => {
      console.log('your saveEdit error ', err)
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = e => {
    axiosWithAuth()
    .delete(`/colors/${e.id}`)
    .then(res => {
      console.log('delete color res ', res)
      getData()
    })
    .catch(err => {
      console.log('your deleteColor error ', err)
    })
    // make a delete request to delete this color
  };

  const handleChange = e => {
    setNewColor({
      ...newColor,
        color : e.target.value
    })
  }

  const hexColor = e => {
    setNewColor({
      ...newColor,
      code: {
        hex : e.target.value
      }
    })
  }

  const additionalColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/colors', newColor)
      .then((res) => {
        updateColors(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <div className="add-color">
        <form onSubmit={ additionalColor }>
          <label htmlFor="color">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color Name"
              value={newColor.color}
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="code">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="HEX Code"
              value={newColor.code.hex}
              onChange={hexColor}
            />
          </label>
          <button className="add-color-button" type="submit">Add New Color</button>
        </form>
      </div>
    </div>

    
  );
};

export default ColorList;
