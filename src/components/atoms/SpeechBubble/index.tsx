export default function SpeechBubble({
  type,
  content,
  state = 'default',
}: {
  type: 'question' | 'answer';
  content: string;
  state?: 'default' | 'selected' | 'disabled';
}) {
  return (
    <>
      {type === 'question' && (
        <div
          className={`text-label-sm bg-secondary text-onSecondary ${tailwindCSS}`}
        >
          {content}
        </div>
      )}
      {type === 'answer' && (
        <button
          className={`justify-center ${state === 'selected' ? 'text-label-sm bg-secondaryEmphasize text-onSecondaryEmphasize' : state === 'disabled' ? 'bg-disabled text-onDisabled' : 'border-[1px] border-secondary bg-background'} ${tailwindCSS}`}
        >
          {content}
        </button>
      )}
    </>
  );
}

const tailwindCSS =
  'flex w-[86%] items-center break-keep rounded-md px-2 py-[10px] shadow-1';
