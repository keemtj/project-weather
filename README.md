# 📝 The.Weather

날씨 API를 이용하여 구현한 날씨 검색 웹 앱입니다.

![the.weather](https://user-images.githubusercontent.com/51189962/103214944-3975c780-4955-11eb-96c7-56ee1d43f2fa.gif)
![weather_time](https://user-images.githubusercontent.com/51189962/103215658-57dcc280-4957-11eb-96c3-ea80c98c5a8a.gif)
![weather-section-right](https://user-images.githubusercontent.com/51189962/103215653-557a6880-4957-11eb-8556-98fcb20a373f.gif)

<br/>

## 💄 UI 템플릿

<img width="640" alt="스크린샷 2020-12-31 15 55 07" src="https://user-images.githubusercontent.com/51189962/103398568-9ef9cc00-4b80-11eb-8d50-10afcb4fe797.png">

- [dribbble](https://dribbble.com/shots/7767460-Weather-App-Website)의 템플릿을 참고하여 작업
- [Reset CSS](https://meyerweb.com/eric/tools/css/reset/)
- [Goole Font](https://fonts.google.com/)

<br/>

## 🧑🏻‍💻 주요 기능

- 검색된 지역의 날씨 상태에 맞게 배경화면을 새롭게 보여주고, 불필요한 API call을 최소한으로 하도록 코드를 작성
- 로컬 스토리지를 통해 새로고침 및 사이트 재접속시 이전 검색결과가 유지되도록 설정

### 🚧 왼쪽 메인화면

- 초기 로딩 시 Seoul을 default로 지정하여 렌더링
- Right section에서 검색한 지역의 현재 기온, 날씨 상태를 포현
- KST기준 현재 날짜를 표시
- 현재 날씨에 맞는 배경화면이 나타나도록 최대한 구현(Random 이미지이기 때문에 날씨에 맞는 쿼리문이 들어가도록 함수를 생성)

### 🚧 오른쪽 섹션

- Another Location에서 새로운 지역을 검색할 수 있는 기능 구현
- input에 아무 것도 입력하지 않으면 새로운 지역을 불러오지 않도록 막음
- 검색된 지역들이 input아래에 나타나도록 구현(최대 10개까지 이전 기록이 쌓임)
- 이전 기록을 클릭하면 해당 지역의 날씨를 불러옴
- 재검색할 지역이 이미 검색된 적이 있는 지역일 경우 기존에 있는 이전 기록을 지우고 최신 기록으로 올림
- 기록을 삭제할 수 있음
- 입력된 지역의 문자가 소문자여도 첫글자를 대문자로 변환하여 아래의 검색기록에 표시되도록 구현
  > sao paulo -> Sao Paulo, seoul -> Seoul
- 현재 지역의 디테일한 날씨 정보를 표시
- 주간 날씨 정보를 표시
  > 현재 요일: monday -> Next Days: tue, wed, thu, fri, sat, sun
- 로컬 스토리지에 현재 날씨가 보여지고 있는 도시 이름과 이전에 검색했던 도시 정보를 저장
  ㄴ
  <br/>

## 🛠 사용 언어

![HTML5](https://img.shields.io/badge/HTML5-DE4B24?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-026DB4?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1D?style=flat-square&logo=javascript&logoColor=white)

<br/>

## ↩️ 커밋 히스토리

[커밋 히스토리](https://github.com/keemtj/project-weather/commits?author=keemtj)

<br/>
