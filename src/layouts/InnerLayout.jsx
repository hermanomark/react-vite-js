const InnerLayout = ({ children }) => {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden">
            {children}
        </div>
    );
}

export default InnerLayout;