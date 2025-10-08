const InnerLayout = ({ children }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {children}
        </div>
    );
}

export default InnerLayout;