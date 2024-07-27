/* 
- 사용 방법 : clip-path 용 hard-coding tailwindCSS code 를 터미널 log 를 통해 취득
> clipPathFrameGenerator(landingBoxCoodinates.third.side, 0.5, 'px') [ref : landingBoxCoodinates 데이터 객체]


TODO: 1. 시계 방향으로 좌표 재정렬 기능 추후 추가  2. 4개 좌표를 가진 사각형만 고려했기에 다른 좌표 개수를 재고려해 코드 수정 필요 예상

- 현상황
> TODO와 현재 발견/잠재된 문제를 해겷하기 위해, 기존 구현 흐름을 참고해 처음부터 코드 재작성 필요
>> 'y축에 평행한 두 직선의 경우에 대한 계산 문제 존재' 외에도 다양한 문제가 잠재할 것으로 예상됨

<구현 흐름>
1. n개 좌표 배열로 받기 
2. y 좌표에 -1 곱해서 좌표 평면을 그리려는 도형과 일치시키기
> clip-path CSS에 양수로 표현되는 y좌표를 좌표 계산을 위해 음수로 바꿔 UI와 좌표 평면을 일치시킴

3. 각 외곽선 직선 함수 구하기(func : innerLineGenerator) [ref : 직선과 직선 사이의 거리 공식 https://ko.wikipedia.org/wiki/%EC%A7%81%EC%84%A0%EA%B3%BC_%EC%A7%81%EC%84%A0_%EC%82%AC%EC%9D%B4%EC%9D%98_%EA%B1%B0%EB%A6%AC]
> 다중 단위를 사용해 CSS 작성 case 반영(e.g., % 와 px 을 동시 사용)
> y축에 평행한 경우 예외 처리(e.g., x=2)
----- TODO : 1. frame 너비 단위 error catch 코드 작성하기

4. 외곽선들 간 교점 구하기(func : intersectionPointGenerator) [ref : 두 직선의 교점 구하기 https://wjs7347.tistory.com/17]
> 교점 구한 후 y 좌표에 다시 -1 을 곱해 clip-path CSS 용 좌표로 변환
----- TODO : 1. 교점이 존재하지 않는 case에 대해 error catch 코드 작성하기 2. 적절한 타입 좁히기를 적용하지 못 해서 미봉책으로 스파게티 코드와 같이 작성됨 [type 정의가 MECE하지 못해서 문제 발생]
----- FIXME : y축에 평행한 두 직선의 경우에 대한 계산이 문제가 있어 ProductCategoryBox comp 의 측면 외곽선의 어긋남 현상이 발생함 [예상 원인 : 코드, clip-path css 표현 한계]

5. 도출된 외곽선 구성 좌표들을 clip-path CSS 코드로 변환(func : clipPathCSSConverter)
> 다중 단위에 사용 여부에 따라 서로 다른 CSS 코드 작성 방식 채택
*/

type CoordinateD2 = {
  x: number;
  y: number;
};

type MultiUnitInterceptY = {
  interceptY: number; // 단위 : %
  movement: number; // 단위 : px
};
type SingleUnitStraightLine = {
  slope: number;
  interceptY: number;
};

type MultiUnitStraightLine = MultiUnitInterceptY & {
  slope: number;
};
type MultiUnitCoodinate = {
  x: MultiUnitInterceptY | number;
  y: MultiUnitInterceptY | number;
};

type ExceptionX = { xAxis: number; movementForException?: number };

/**
 * @param coordinates 좌표 배열 [좌표 순서 : 시계 방향]
 * @param frameWidth frame 폭
 * @param frameWidthUnit 'px' || '%'
 * @returns clip-path: polygon() 에 삽입할 tailwindCSS 코드
 */
export function clipPathFrameGenerator(
  coordinates: CoordinateD2[],
  frameWidth: number,
  frameWidthUnit: 'px' | '%',
): [string, string] | null {
  if (coordinates.length === 4) {
    const [p1, p2, p3, p4] = coordinates.map((v) => ({ x: v.x, y: v.y * -1 }));

    const horizontalInnerLine1 = innerLineGenerator(
      p1,
      p2,
      frameWidth,
      frameWidthUnit,
      false,
    );
    const horizontalInnerLine2 = innerLineGenerator(
      p3,
      p4,
      frameWidth,
      frameWidthUnit,
      true,
    );

    const verticalInnerLine1 = innerLineGenerator(
      p1,
      p4,
      frameWidth,
      frameWidthUnit,
      false,
    );

    const verticalInnerLine2 = innerLineGenerator(
      p2,
      p3,
      frameWidth,
      frameWidthUnit,
      true,
    );

    const innerP1 = intersectionPointGenerator(
      horizontalInnerLine1,
      verticalInnerLine1,
    );
    const innerP2 = intersectionPointGenerator(
      horizontalInnerLine1,
      verticalInnerLine2,
    );
    const innerP3 = intersectionPointGenerator(
      horizontalInnerLine2,
      verticalInnerLine2,
    );

    const innerP4 = intersectionPointGenerator(
      horizontalInnerLine2,
      verticalInnerLine1,
    );

    const clipPathFrameCSS =
      clipPathCSSConverter(coordinates[0], true) +
      clipPathCSSConverter({ x: innerP1.x, y: coordinates[0].y }) +
      clipPathCSSConverter(innerP1) + // (mistake) 사선을 포함하는 도형의 경우 frame content 시작점이 필요함
      clipPathCSSConverter(innerP4) +
      clipPathCSSConverter(innerP3) +
      clipPathCSSConverter(innerP2) +
      clipPathCSSConverter(innerP1) +
      clipPathCSSConverter({ x: innerP1.x, y: coordinates[0].y }) +
      clipPathCSSConverter(coordinates[1]) +
      clipPathCSSConverter(coordinates[2]) +
      clipPathCSSConverter(coordinates[3], false, true);

    const clipPathFrameContentCSS =
      clipPathCSSConverter(innerP4, true) +
      clipPathCSSConverter(innerP3) +
      clipPathCSSConverter(innerP2) +
      clipPathCSSConverter(innerP1, false, true);

    const frameClassName = `[clip-path:polygon(${clipPathFrameCSS})]`;
    const frameContentClassName = `[clip-path:polygon(${clipPathFrameContentCSS})]`;

    console.log('frame : ', frameClassName, '\n');
    console.log('frame content : ', frameContentClassName, '\n\n');

    return [frameClassName, frameContentClassName];
  }
  return null;
}

function innerLineGenerator(
  p1: CoordinateD2,
  p2: CoordinateD2,
  frameWidth: number,
  frameWidthUnit: 'px' | '%',
  isPositiveMovement: boolean,
): ExceptionX | MultiUnitStraightLine | SingleUnitStraightLine {
  // y축 평행한 직선의 경우,하위 공식에 적용 불가능해 예외 처리
  if (p1.x - p2.x === 0) {
    if (frameWidthUnit === 'px') {
      return {
        xAxis: p1.x,
        movementForException: isPositiveMovement ? frameWidth : -1 * frameWidth,
      };
    } else if (frameWidthUnit === '%') {
      return {
        xAxis: p1.x,
      };
    }
    throw new Error('frame 너비 단위를 잘못 입력했습니다.');
  }
  // 기존 직선
  const slope = (p1.y - p2.y) / (p1.x - p2.x);
  const interceptY = p1.y - slope * p1.x;
  const leftHandSide = Math.sqrt(slope ** 2 + 1) * frameWidth; // 양수값만을 가짐
  // 기존 직선에 평행한 새로운 직선
  if (frameWidthUnit === 'px') {
    // leftHandSide가 무조건 0보다 큰 양수만을 가짐으로, 그래프 이동 방향이 좌상향(positive)일 경우 y절편이 커지는 식 적용
    const multiUnitInterceptY = isPositiveMovement
      ? { interceptY, movement: leftHandSide }
      : { interceptY, movement: -1 * leftHandSide };

    return { slope, ...multiUnitInterceptY };
  } else if (frameWidthUnit === '%') {
    // leftHandSide가 무조건 0보다 큰 양수만을 가짐으로, 그래프 이동 방향이 좌상향(positive)일 경우 y절편이 커지는 식 적용[+양수(leftHandSide)]
    const newInterceptY = isPositiveMovement
      ? interceptY + leftHandSide
      : interceptY - leftHandSide;

    return { slope, interceptY: newInterceptY };
  }
  throw new Error('frame 너비 단위를 잘못 입력했습니다.');
}

function intersectionPointGenerator(
  line1: ExceptionX | MultiUnitStraightLine | SingleUnitStraightLine,
  line2: ExceptionX | MultiUnitStraightLine | SingleUnitStraightLine,
): MultiUnitCoodinate {
  if ('xAxis' in line1 && 'xAxis' in line2) {
    throw new Error('교점이 존재하지 않는 두 직선입니다.');
  }

  if ('xAxis' in line1 && 'slope' in line2) {
    if (line1.movementForException && 'movement' in line2) {
      const coordinateX = {
        interceptY: line1.xAxis,
        movement: -1 * line1.movementForException,
      };
      const coordinateY = {
        interceptY:
          -1 * (line2.slope * coordinateX.interceptY + line2.interceptY),
        movement: -1 * (line2.slope * coordinateX.movement + line2.movement),
      };

      return {
        x: coordinateX,
        y: coordinateY,
      };
    }
    const coordinateX = -1 * line1.xAxis;
    const coordinateY = -1 * (line2.slope * coordinateX + line2.interceptY);

    return {
      x: coordinateX,
      y: coordinateY,
    };
  }

  if ('xAxis' in line2 && 'slope' in line1) {
    if (line2.movementForException && 'movement' in line1) {
      const coordinateX = {
        interceptY: line2.xAxis,
        movement: -1 * line2.movementForException,
      };
      const coordinateY = {
        interceptY:
          -1 * (line1.slope * coordinateX.interceptY + line1.interceptY),
        movement: -1 * (line1.slope * coordinateX.movement + line1.movement),
      };

      return {
        x: coordinateX,
        y: coordinateY,
      };
    }
    const coordinateX = line2.xAxis;
    const coordinateY = -1 * (line1.slope * coordinateX + line1.interceptY);

    return {
      x: coordinateX,
      y: coordinateY,
    };
  }

  if ('slope' in line1 && 'slope' in line2 && line1.slope - line2.slope === 0) {
    throw new Error('교점이 존재하지 않는 두 직선입니다.');
  }
  if ('movement' in line1 && 'movement' in line2) {
    // (mistake) 분모, 분자에서 "-" 를 기준으로 역순의 line 관계를 가지는게 정상
    const coordinateX = {
      interceptY:
        (line2.interceptY - line1.interceptY) / (line1.slope - line2.slope),
      movement: (line2.movement - line1.movement) / (line1.slope - line2.slope),
    };
    // 다시 -1 을 곱해 clip-path 용 좌표값인 양수로 변환
    const coordinateY = {
      interceptY:
        -1 * (line1.slope * coordinateX.interceptY + line1.interceptY), // (mistake) -1 곱셈을 괄호 없이 첫 항에만 적용함
      movement: -1 * (line1.slope * coordinateX.movement + line1.movement),
    };
    return {
      x: coordinateX,
      y: coordinateY,
    };
  }
  if ('interceptY' in line1 && 'interceptY' in line2) {
    const coordinateX =
      (line2.interceptY - line1.interceptY) / (line1.slope - line2.slope);
    const coordinateY = -1 * (line1.slope * coordinateX + line1.interceptY);
    return {
      x: coordinateX,
      y: coordinateY,
    };
  }
  return {
    x: 0,
    y: 0,
  };
}

function clipPathCSSConverter(
  { x, y }: MultiUnitCoodinate,
  isFirst: boolean = false,
  isLast: boolean = false,
) {
  let coordinateX;
  let coordinateY;
  if (typeof x === 'number') {
    coordinateX = `${x % 1 === 0 ? x : x.toFixed(6)}%`;
  } else if (typeof x === 'object') {
    coordinateX = `calc(${x.interceptY % 1 === 0 ? x.interceptY : x.interceptY.toFixed(6)}%${x.movement > 0 ? '+' : ''}${x.movement % 1 === 0 ? x.movement : x.movement.toFixed(6)}px)`;
  }
  if (typeof y === 'number') {
    coordinateY = `${y % 1 === 0 ? y : y.toFixed(6)}%`;
  } else if (typeof y === 'object') {
    coordinateY = `calc(${y.interceptY % 1 === 0 ? y.interceptY : y.interceptY.toFixed(6)}%${y.movement > 0 ? '+' : ''}${y.movement % 1 === 0 ? y.movement : y.movement.toFixed(6)}px)`;
  }
  return `${isFirst ? '' : '_'}${coordinateX}_${coordinateY}${isLast ? '' : ','}`;
}
