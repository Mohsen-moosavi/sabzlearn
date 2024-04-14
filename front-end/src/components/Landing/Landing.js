import React, { useContext } from 'react'
import './Landing.css'
import Typewriter from 'typewriter-effect';
import Counter from '../Counter/Counter';
import Input from '../Form/Inpit/Input';
import useForm from '../../hooks/useForm';
import { requiredValidator } from '../../Utils/Validator/Rouls';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { IoIosSearch } from "react-icons/io";

export default function Landing() {

  const navigate = useNavigate()
  const mainInfos = useContext(AuthContext).mainInfos

  const [formState, onInputHandler] = useForm({
    globalSearch: {
      value: '',
      isValid: false
    }
  }, false)

  function globalSearchHandler() {
    navigate(`/search/${formState.initInputs.globalSearch.value}`)
  }

  return (
    <section class="landing">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-sm-7">
            <div class="landing__cover">
              <img src="./image/banner-min.png" class="landing__image" alt="sabzlearn" />
            </div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="landing__content">
              <h1 class="landing__title">یادگیری قدم به قدم برنامه نویسی با<br /><span
                class="landing__title-text landing__bold-title">دوره های جامع سبزلرن</span></h1>
              <p class="landing__description">اگه عاشق کد زدن هستی و نمی دونی از کجا باید کارت رو شروع
                کنی، با دوره های جامه سبزلرن خیلی زود پیشرفت کن و تبدیل به یه حرفه ای شو. موفقت در کمین
                توست...</p>
              <form action="" class="search-form">
                <Input
                  id={"globalSearch"}
                  element={"input"}
                  type="text"
                  className="search-form__input"
                  placeholder="جستجو در دوره ها"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator()
                  ]}
                />
                <button type="submit" class="search-form__submit" disabled={!formState.isValidForm} onClick={globalSearchHandler}>
                  <IoIosSearch class="search-form__submit-icon"/>
                </button>
              </form>
              <div class="landing__academy-infos">
                <div class="row">
                  <div class="col-4">
                    <div class="landing__academy-info-item">
                      <img src="./image/icons/stopwatch.png" class="landing__academy-icon"
                        alt="time" />
                      <Counter scale={mainInfos.totalTime} />
                      <span class="landing__academy-title">دقیقه آموزش</span>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="landing__academy-info-item">
                      <img src="./image/icons/online-course.png" class="landing__academy-icon"
                        alt="course" />
                                  <Counter scale={mainInfos.coursesCount} />
                      <span class="landing__academy-title">دوره آموزشی</span>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="landing__academy-info-item">
                      <img src="./image/icons/graduated.png" class="landing__academy-icon"
                        alt="student" />
                                    <Counter scale={mainInfos.usersCount} />
                      <span class="landing__academy-title">دانشجو آکادمی</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
