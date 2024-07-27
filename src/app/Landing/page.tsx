import ProductCategroyBox from '@/components/ProductCategoryBox';

export default function Landing() {
  return (
    <>
      <header className="h-[80px] w-full bg-[#348560]">header area</header>
      <main className="relative h-[calc(100%-128px)] w-full">
        {/* 배경 */}
        <div className="h-full w-full">
          {/* 상단 */}
          <div className="h-[36.5%] w-full bg-[#FFD159]"></div>
          {/* 하단 */}
          <div className="h-[63.5%] w-full bg-[#74FF8A]"></div>
        </div>
        {/* 상품 카테고리 목록 */}
        <ol
          className="absolute left-[0] top-[0] z-10 h-full w-full"
          aria-label="상품 카테고리 목록"
        >
          {/* first row */}
          <li className="absolute left-[0] top-[0] h-[43.5%] w-full">
            <ol>
              <li>
                <ProductCategroyBox rowOrder="first" direction="left" />
              </li>
              <li>
                <ProductCategroyBox rowOrder="first" direction="right" />
              </li>
            </ol>
          </li>
          {/* second row */}
          <li className="absolute left-[0] top-[30%] h-[28%] w-full">
            <ol>
              <li>
                <ProductCategroyBox rowOrder="second" direction="left" />
              </li>
              <li>
                <ProductCategroyBox rowOrder="second" direction="right" />
              </li>
            </ol>
          </li>
          {/* third row */}
          <li className="absolute left-[0] top-[66.5%] h-[33.5%] w-full">
            <ol>
              <li>
                <ProductCategroyBox rowOrder="third" direction="left" />
              </li>
              <li>
                <ProductCategroyBox rowOrder="third" direction="right" />
              </li>
            </ol>
          </li>
        </ol>
      </main>
      <footer className="h-12 w-full bg-[#475bce]">footer area</footer>
    </>
  );
}
