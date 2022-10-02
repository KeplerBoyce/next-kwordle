export default function InputGroup(props: {className?: string, name: string, value: string, setValue: (x: string) => void}) {
    const {className, name, value, setValue} = props;

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-gray-400 whitespace-nowrap uppercase">
                {name}
            </p>
            <input
                className={"border border-gray-400 rounded-lg p-2 " + className}
                type="text"
                placeholder="type here..."
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    )
}