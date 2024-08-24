import ProductCategoryGroupContainer from '@/components/containers/ProductCategoryGroupContainer';
import SearchBox from '@/components/molecules/SearchBox';

export default function Landing() {
  return (
    <>
      <div className="h-[32px] w-full">
        <SearchBox pageName="Landing" />
      </div>
      <main className="relative h-[calc(100%-128px)] w-full">
        {/* 배경 */}
        <div className="h-full w-full">
          {/* 상단 */}
          <div className="h-[36.5%] w-full bg-[#FFD159]"></div>
          {/* 하단 */}
          <div className="h-[63.5%] w-full bg-[#74FF8A]"></div>
        </div>
        {/* 상품 카테고리 목록 */}
        <ProductCategoryGroupContainer />
      </main>
    </>
  );
}