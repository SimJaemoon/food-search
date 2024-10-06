## 프로젝트 주제

### <U>X세대 온라인 식료품 구매 거부감을 해소하기 위한, 새로운 온라인 장보기 경험 설계</U>

<a href="https://food-search-simjaemoons-projects.vercel.app/" target="_blank">배포된 사이트 보러 가기 ↗</a>

<br />

## 수행 과정

<a href="https://github.com/SimJaemoon/SimJaemoon/blob/main/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4_%EC%8B%AC%EC%9E%AC%EB%AC%B8.pdf" target="_blank">프로젝트 보고서 보러 가기 ↗</a> (현재 포트폴리오 파일로 대체 -- 추후 교체 예정)


### A. 기획

&nbsp;**1. 문제 탐색 :** “식사 Flow” 중 “주문 Process” &nbsp;&nbsp;&nbsp;[식사 Flowchart 보러 가기 ↗](https://www.figma.com/board/c3zxwpmIW0PFxOXl1Bp9N9/TP-FOODSEARCH_%EB%B0%B0%ED%8F%AC_240922?node-id=1002-6249&t=PvnyjIjxTJhS09VQ-4, "식사 Flowchart")

&nbsp;**2. 문제 인식 :** X세대가 온라인으로 식료품을 구매할 능력은 있지만, 실제 구매 행동으로 이어지지 못하는 문제 상황 포착

&nbsp;**3. 문제 분석 :** 문제와 관련된 대상 분석(Market, Service, User) &nbsp;&nbsp;&nbsp;[기존 서비스 분석 보러 가기 ↗](https://www.figma.com/board/c3zxwpmIW0PFxOXl1Bp9N9/TP-FOODSEARCH_%EB%B0%B0%ED%8F%AC_240922?node-id=1002-6254&t=PvnyjIjxTJhS09VQ-4, "기존 서비스 분석")  
&emsp;&nbsp; ▶ Market(대형마트 - 온라인 - Mobile), Service(온라인 장보기), User(X세대)

&nbsp;**4. (가정) 문제 정의 :** 사용자 조사를 통해 파악한 원인들에 대한 해결 방향 도출  
&emsp;&nbsp; ▶ **문제 원인 1.** 콘텐츠 과잉 공급&nbsp; **→ &nbsp;해결 방향 :** page 구성 콘텐츠 최소화  
&emsp;&nbsp; ▶ **문제 원인 2.** 장보기 방식 괴리감&nbsp; **→ &nbsp;해결 방향 :** 익숙함(오프라인 장보기 경험)을 통해 낯설음(온라인 장보기 거부감) 해소

<br/>

### B. 디자인

&nbsp;**1. 콘텐츠 기획 :** 새로운 온라인 장보기 경험을 구성하는 콘텐츠 설계  
&emsp;&nbsp; ▶ 기존 서비스 대비 전체 page 수 감소(7 → 5)  
&emsp;&nbsp; ▶ 모든 page 에서 프로모션 알림 콘텐츠 배제  

&nbsp;**2. 화면 설계 :** 시장을 구경하며 상품을 구매한 경험을 연상시키는 Object 구성  
&emsp;&nbsp; ▶ **Object :** 1. 시장 입구/내부 2. 시장 매대 3. 종이 영수증 4. 주문 대화  

&emsp;&emsp;<a href="https://www.figma.com/design/eYS9TCDxyCUX8tsLPq5sGO/TP_Foodsearch_%EB%B0%B0%ED%8F%AC_000000?node-id=359-145&t=XrUtWrf96rONdBw5-1" target="_blank">디자인 Foundation 보러 가기 ↗</a>  
&emsp;&emsp;<a href="https://www.figma.com/design/eYS9TCDxyCUX8tsLPq5sGO/TP_Foodsearch_%EB%B0%B0%ED%8F%AC_000000?node-id=23-995&t=XrUtWrf96rONdBw5-1" target="_blank">화면 설계 보러 가기 ↗</a>  

<br/>

### C. 개발

&nbsp;**1. 화면 구현 :** 컴포넌트를 뼈대(Presentational) 와 동작(Container) 으로 구분하는 설계 방식 채택  
&emsp;&emsp;<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0" target="_blank">(Dan Abramov(2015), Presentational and Container Components)</a>  

&emsp;&nbsp; ▶ **UI**(Presentational) **:** 컴포넌트 분류를 위해 Atomic Design 참고 <a href="https://atomicdesign.bradfrost.com/chapter-2/" target="_blank">(Brad Frost, Atomic Design Methodology)</a>  
&emsp;&nbsp; ▶ **Feature**(Container) **:** 데이터 가져오기, State 관리, 애니메이션 구현  

&emsp;&emsp;<a href="https://66f0d4048382e05e635a8f98-nlzwzdvqes.chromatic.com/" target="_blank">컴포넌트 보러 가기(Storybook) ↗</a>

<br />

&nbsp;**2. 시행착오 :** 설계(기획, 디자인)와 구현(개발) 간 조율  
&emsp;&nbsp; ▶ **UI :** 개발과 디자인(Figma) 간 구현 방식 차이로 인한 난이도 불일치  
&emsp;&nbsp; ▶ **Feature**(State 관리 & 애니메이션 구현) **:** 개발 중 디자인 변경  
&emsp;&nbsp; ▶ **사용성 개선 :** 경험의 연속성 보존[pagination 상태 보존 요청 대응]
