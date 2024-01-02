
const SectionTitle = ({headings, subtitles}) => {
    return (
        <div className="w-1/3 mx-auto mb-10 text-center">
            <p className="text-lg text-[#D99904] font-medium mt-12 italic">---{subtitles}---</p>
            <h3 className="text-3xl uppercase font-medium border-y-4 py-4 my-5">{headings}</h3>
        </div>
    );
};

export default SectionTitle;