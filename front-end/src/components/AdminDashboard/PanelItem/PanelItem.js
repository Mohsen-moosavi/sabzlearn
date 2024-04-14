import React from 'react'
import './PanelItem.css'
import { MdOutlineDoneOutline } from 'react-icons/md'

export default function PanelItem({ title, count }) {
  return (
      <div class="panel-item">
        <div class="pane-item-box">
          <div class="panel-item-box__content">
            <div class="panel-item-box__title">
              <span className='panel-item-box__title-span'>{title}</span>
            </div>
            <div class="panel-item-box__value">
                <span class="panel-item-box__price">{count}</span>
                <MdOutlineDoneOutline className='panel-item-box__icon'/>
            </div>
            <div >
              <span class="panel-item-box__text">{title} در یک ماه گذشته</span>
            </div>
          </div>
          {/* <div class="home-box-right">
            <div class="panel-item-box__icon-wrapper">
              <MdOutlineDoneOutline className='panel-item-box__icon'/>
            </div>
          </div> */}
        </div>
      </div>
  )
}
