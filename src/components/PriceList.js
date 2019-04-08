import React from 'react'
import Ionicon from 'react-ionicons'
import { TYPE_OUTCOME, Colors } from '../utility'

const PriceList = ({ list, onModifyItem, onDeleteItem }) => {
  return (<ul className="list-group list-group-flush">
    {
      list.map((item, index) => {
        return (<li className="list-group-item d-flex
            justify-content-between align-items-center" key={item.id}>
          <span className="col-1">
            <Ionicon
              className="rounded-circle"
              fontSize="30px"
              style={{ backgroundColor: Colors.blue, padding: '5px'}}
              color={'#fff'}
              icon={item.category.iconName}
            />
          </span>
          <strong className="col-5">
            {item.title}
          </strong>
          <strong className="col-2">
            {item.category.type === TYPE_OUTCOME ? '- ' : '+ '}
            {item.price }元</strong>
          <span className="col-2">{item.date}</span>
          <a className="col-1" role="button" href="#"
            onClick={(event) => {event.preventDefault(); onModifyItem(item)}}
          >
            <Ionicon
              className="rounded-circle"
              fontSize="30px"
              style={{ backgroundColor: Colors.green, padding: '5px'}}
              color={'#fff'}
              icon='ios-create-outline'
            />
          </a>
          <a className="col-1"
              role="button"
              onClick={(event) => {event.preventDefault(); onDeleteItem(item)}}
            >
              <Ionicon
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: Colors.red, padding: '5px'}}
                color={'#fff'}
                icon='ios-close'
              />
            </a>
        </li>)
      })
    }
  </ul>)
}

export default PriceList