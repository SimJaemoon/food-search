import Footer from '@/components/Footer';

export default function ProductList() {
  return (
    <>
      <header className="h-12 w-full bg-[#348560]">header area</header>
      <nav className="h-[80px] w-full">
        <div className="h-8 w-full bg-[#85344c]">nav area 1</div>
        <div className="h-12 w-full bg-[#af4f7fc9]">nav area 2</div>
      </nav>
      <main className="relative h-[calc(100%-176px)] w-full">
        {/* 매대 상자 */}
        <div className="absolute bottom-4 left-[12px] h-[148px] w-[calc(100%-24px)]">
          {/* 윗면 */}
          <div className="absolute left-[0] top-[0] h-11 w-full bg-background [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondaryEmphasize [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]"></div>
          </div>
          {/* 정면 */}
          <div className="absolute left-[12px] top-[44px] h-[calc(100%-44px)] w-[calc(100%-12px)] border-[0.5px] border-background bg-secondary shadow-figma"></div>
          {/* 측면 */}
          <div className="absolute left-[0] top-[0] h-full w-3 bg-background [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]">
            {/* 외곽선 생성 */}
            <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondary [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]"></div>
          </div>
        </div>
        {/* 상품 목록 */}
        <ol className="absolute left-[0] top-[0] h-[calc(100%-16px-148px+28px)] w-full bg-highlight opacity-50"></ol>
      </main>
      <Footer />
    </>
  );
}
