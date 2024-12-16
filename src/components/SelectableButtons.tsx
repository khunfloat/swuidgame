interface SelectableButtonsProps {
  choices: string[]; // ตัวเลือกปุ่ม
  onSelect: (choice: string) => void; // Callback ฟังก์ชันส่งค่าเมื่อเลือก
  selectedIndex: number | null; // Index ของปุ่มที่ถูกเลือก
}

const SelectableButtons = ({
  choices,
  onSelect,
  selectedIndex,
}: SelectableButtonsProps) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(choices[index])}
          className={`text-black font-bold px-2 py-2 text-xl rounded-lg transition-all duration-100
            ${selectedIndex === index ? "bg-white" : "bg-neutral-500"}`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default SelectableButtons;
