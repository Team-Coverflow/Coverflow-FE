import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../asset/sass/etc/header/header.scss';
import Hambar from '../../../asset/image/hambar.svg';
import Loginuser from '../../../asset/image/loginuser.svg';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  API_BASE_URL,
} from '../../pages/loginPage/constants/index.js';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null); // 오버레이를 위한 ref 추가

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);
  }, []);

  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuClick = (menu) => {
    setIsDropdownOpen(false);
    if (menu === '마이페이지') {
      navigate('/mypage');
    } else if (menu === '상점') {
      navigate('/store');
    } else if (menu === '로그아웃') {
      logout();
    }
  };

  const logout = () => {
    fetch(`${API_BASE_URL}/api/member/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          setIsLoggedIn(false);
          navigate('/');
        } else {
          response
            .json()
            .then((err) => {
              console.error(
                '로그아웃 실패:',
                err.message || '서버에서 에러가 발생했습니다.',
              );
            })
            .catch((jsonError) => {
              console.error('응답 파싱 에러:', jsonError);
            });
        }
      })
      .catch((error) => {
        console.error('네트워크 에러 또는 요청 실패:', error.message);
      });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !(overlayRef.current && overlayRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isDropdownOpen && (
        <div
          className="overlay"
          ref={overlayRef}
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
      <header>
        <img className="hambar" src={Hambar} alt="메뉴" />
        {isLoggedIn ? (
          <div className="user-icon-container" ref={dropdownRef}>
            <img
              className="loginuser"
              src={Loginuser}
              alt="로그인 유저 아이콘"
              onClick={handleUserIconClick}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <hr className="up-hr" />
                  <li
                    className="dropdown-item"
                    onClick={() => handleMenuClick('마이페이지')}
                  >
                    마이페이지
                  </li>
                  <hr />
                  <li
                    className="dropdown-item"
                    onClick={() => handleMenuClick('상점')}
                  >
                    상점
                  </li>
                  <hr />
                  <li
                    className="dropdown-item"
                    onClick={() => handleMenuClick('로그아웃')}
                  >
                    로그아웃
                  </li>
                  <hr className="down-hr" />
                </ul>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="login-btn">
            로그인 / 가입
          </a>
        )}
      </header>
    </>
  );
}

export default Header;
