import React from 'react'
import './menu.scss'
import Slider from 'react-slick'
import PageWrapper from './pageWrapper/PageWrapper'
import MenuBtnContainer from './menuButton/MenuBtn'
import AgentPage from '../../pages/agent/AgentPage'
import UsersPage from '../../pages/users/UsersPage'
import SystemPage from '../../pages/system/SystemPage'
import ActionPage from '../../pages/actions/ActionPage'

const Menu = () => {
  const menusName = ['Пристрої', 'Надзвичайні ситуації', 'Система', 'Користувачі']

  const sliderRef = React.useRef()

  const goToSlide = (key) => {
    sliderRef.current && sliderRef.current.slickGoTo(key)
  }

  const settings = {
    ref: sliderRef,
    appendDots: function (dots) {
      return (
        <MenuBtnContainer
          dots={dots}
          context={this}
          names={menusName}
          goToSlide={goToSlide}
        />
      )
    },
    arrows: false,
    dots: true,
    focusOnSelect: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          centerMode: false,
          infinite: false,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],

    speed: 500,
  }
  return (
    <Slider {...settings}>
      <PageWrapper>
        <AgentPage />
      </PageWrapper>

      <PageWrapper>
        <ActionPage />
      </PageWrapper>

      <PageWrapper>
        <SystemPage />
      </PageWrapper>
      <PageWrapper>
        <UsersPage />
      </PageWrapper>
    </Slider>
  )
}

export default Menu
