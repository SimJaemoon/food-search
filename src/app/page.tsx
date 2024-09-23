'use client';

import Spinner from '@/components/atoms/Spinner';
import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react';

export default function Splash() {
  const splashScreenRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    router.replace('/Landing');
  });

  return (
    <>
      {/* FIXME: 삭제 예정 */}
      <div className="absolute z-10 h-[calc(100%-32px)] w-[calc(100%-32px)]">
        <Spinner />
      </div>
      <div
        ref={splashScreenRef}
        className={`absolute h-[calc(100%-32px)] w-[calc(100%-32px)]`}
      >
        {/* 배경 */}
        <div>
          {/* 천장 */}
          <div className="absolute left-[0%] top-[0%] h-[35%] w-full bg-[#0FC5FF] [clip-path:polygon(0%_0%,_100%_0%,_100%_100%,_0%_100%)]"></div>
          {/* 측벽 */}
          <div>
            {/* 완쪽 */}
            <div className="absolute left-[0%] top-[20%] h-4/5 w-2/5 bg-[#FFD159] [clip-path:polygon(0%_0%,_100%_12.5%,_100%_31.25%,_0%_100%)]"></div>
            {/* 오른쪽 */}
            <div className="absolute left-[60%] top-[20%] h-4/5 w-2/5 bg-[#FFD159] [clip-path:polygon(0%_12.5%,_100%_0%,_100%_100%,_0%_31.25%)]"></div>
          </div>
          {/* 길 */}
          <div className="absolute left-[0%] top-[45%] h-[55%] w-full bg-[#848484] [clip-path:polygon(40%_0%,_60%_0%,_100%_100%,_0%_100%)]"></div>
          {/* 입구 */}
          <div>
            {/* 원 */}
            <div className="absolute left-[40%] top-[30%] h-[10%] w-[20%] bg-[#E3E2E2] [clip-path:ellipse(50%_50%_at_50%_50%)]"></div>
            {/* 사각형 */}
            <div className="absolute left-[40%] top-[35%] h-[10%] w-[20%] bg-[#E3E2E2]"></div>
          </div>
        </div>
        {/* 사람 */}
        <div className="text-label-sm absolute left-1/2 top-1/2 h-1/5 w-1/5 -translate-x-1/2 bg-[#74FF8A]">
          <div className="relative top-1/2 z-50 -translate-y-1/2 text-center">
            Person
          </div>
        </div>
      </div>
    </>
  );
}
