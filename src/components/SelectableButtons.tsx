import { useState } from "react";

interface SelectableButtonsProps {
  choices: string[]; // ตัวเลือกปุ่ม
  onSelect: (choice: string) => void; // Callback ฟังก์ชันส่งค่าเมื่อเลือก
}

const SelectableButtons = ({ choices, onSelect }: SelectableButtonsProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    onSelect(choices[index]); // เรียก callback ส่งค่าที่เลือกกลับไป
  };

  return (
    <div className="flex gap-4 justify-center items-center">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          className={`text-black font-bold px-2 py-2 text-xl rounded-lg transition-all duration-100
            ${selected === index ? "bg-white" : "bg-neutral-500"}`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default SelectableButtons;
