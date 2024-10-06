## 프로젝트 주제 [24.04 ~ ]

### " X세대 온라인 식료품 구매 거부감을 해소하기 위한, 새로운 온라인 장보기 경험 설계 "

<a href="https://food-search-simjaemoons-projects.vercel.app/" target="_blank">배포된 사이트 보러 가기 ↗</a>

<br />

## 수행 과정

<a href="https://github.com/SimJaemoon/SimJaemoon/blob/main/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4_%EC%8B%AC%EC%9E%AC%EB%AC%B8.pdf" target="_blank">프로젝트 보고서 보러 가기 ↗</a> &emsp;&nbsp;([추후 교체 예정](https://github.com/SimJaemoon/food-search/blob/main/document/TP_FOODSEARCH_Deliver_46_%EC%9E%91%EC%97%85%EC%A4%91.pdf)) 


### <ins>A. 기획 [24.04 ~ 24.06]</ins>

&nbsp;**1. 문제 탐색 :** “식사 Flow” 중 “주문 Process” &nbsp;&nbsp;&nbsp;[식사 Flowchart 보러 가기 ↗](https://www.figma.com/board/c3zxwpmIW0PFxOXl1Bp9N9/TP-FOODSEARCH_%EB%B0%B0%ED%8F%AC_240922?node-id=1002-6249&t=PvnyjIjxTJhS09VQ-4, "식사 Flowchart")

&nbsp;**2. 문제 인식 :** X세대가 온라인으로 식료품을 구매할 능력은 있지만, 실제 구매 행동으로 이어지지 못하는 문제 상황 포착

&nbsp;**3. 문제 분석 :** 문제와 관련된 대상 분석 &nbsp;&nbsp;&nbsp;[기존 서비스 분석 보러 가기 ↗](https://www.figma.com/board/c3zxwpmIW0PFxOXl1Bp9N9/TP-FOODSEARCH_%EB%B0%B0%ED%8F%AC_240922?node-id=1002-6254&t=PvnyjIjxTJhS09VQ-4, "기존 서비스 분석")  

&emsp;&nbsp; ▶ &nbsp;**Market :** 식료품 구매처 - 온라인 / 대형마트 / Mobile  
&emsp;&nbsp; ▶ &nbsp;**Service :** 온라인 장보기 - 전형적인 e-커머스 디자인(page Flow, Layout)  
&emsp;&nbsp; ▶ &nbsp;**User :** X세대 - 서비스 접근성, 기회 요인, 수익성 측면에서 분석  

<br />

&nbsp;**4.** (가정) **문제 정의 :** 사용자 조사를 통해 파악한 원인들에 대한 해결 방향 도출  

&emsp;&nbsp; ▶ &nbsp;**문제 원인 1.** 콘텐츠 과잉 공급&nbsp; **→ &nbsp;해결 방향 :** page 구성 콘텐츠 최소화  
&emsp;&nbsp; ▶ &nbsp;**문제 원인 2.** 장보기 방식 괴리감&nbsp;  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; **→ &nbsp;해결 방향 :** 익숙함(오프라인 장보기 경험)을 통해 낯설음(온라인 장보기 거부감) 해소

<br/>
<br />

### <ins>B. 디자인 [24.06 ~ 24.07]</ins>

&nbsp;**1. 콘텐츠 기획 :** 새로운 온라인 장보기 경험을 구성하는 콘텐츠 설계  

&emsp;&nbsp; ▶ &nbsp;기존 서비스 대비 전체 page 수 감소(7 → 5)  
&emsp;&nbsp; ▶ &nbsp;모든 page 에서 프로모션 알림 콘텐츠 배제  

<br />

&nbsp;**2. 화면 설계 :** 시장을 구경하며 상품을 구매한 경험을 연상시키는 Object 구성  

&emsp;&nbsp; ▶ &nbsp;**Object :** 1. 시장 입구/내부 2. 시장 매대 3. 종이 영수증 4. 주문 대화  

&emsp;&emsp;<a href="https://www.figma.com/design/eYS9TCDxyCUX8tsLPq5sGO/TP_Foodsearch_%EB%B0%B0%ED%8F%AC_000000?node-id=359-145&t=XrUtWrf96rONdBw5-1" target="_blank">디자인 Foundation 보러 가기 ↗</a>  
&emsp;&emsp;<a href="https://www.figma.com/design/eYS9TCDxyCUX8tsLPq5sGO/TP_Foodsearch_%EB%B0%B0%ED%8F%AC_000000?node-id=23-995&t=XrUtWrf96rONdBw5-1" target="_blank">화면 설계 보러 가기 ↗</a>  

<br/>
<br />

### <ins>C. 개발 [24.07 ~ ]</ins>

&nbsp;**1. 화면 구현 :** 컴포넌트를 뼈대(Presentational) 와 동작(Container) 으로 구분하는 설계 방식 채택  

&emsp;&nbsp; ▶ &nbsp;**UI**(Presentational) **:** 컴포넌트 분류를 위해 Atomic Design 참고 &nbsp;&nbsp;&nbsp;<a href="https://66f0d4048382e05e635a8f98-nlzwzdvqes.chromatic.com/" target="_blank">컴포넌트 보러 가기(Storybook) ↗</a>  
&emsp;&nbsp; ▶ &nbsp;**Feature**(Container) **:** 데이터 가져오기, State 관리, 애니메이션 구현  



<br />

&nbsp;**2. 시행착오 :** 설계(기획, 디자인)와 구현(개발) 간 조율  

&emsp;&nbsp; ▶ &nbsp;**UI :** 개발과 디자인(Figma) 간 구현 방식 차이로 인한 난이도 불일치  
&emsp;&nbsp; ▶ &nbsp;**Feature**(State 관리 & 애니메이션 구현) **:** 개발 중 디자인 변경  
&emsp;&nbsp; ▶ &nbsp;**사용성 개선 :** 경험의 연속성 보존[pagination 상태 보존 요청 대응]
