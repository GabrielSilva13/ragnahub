type Attribute = {
  title: string | number | undefined
  value: string | number | undefined
}

type AttributeListProps = {
  attributes: Attribute[]
  columnTitle?: string
  isSpecialColumn?: boolean
}

export const AttributeList: React.FC<AttributeListProps> = ({
  attributes,
  columnTitle,
  isSpecialColumn,
}) => (
  <div
    className={`mt-5 w-full max-w-fit ${
      isSpecialColumn ? '' : 'flex flex-col gap-4'
    }`}
  >
    {isSpecialColumn && (
      <div className="mb-4 mt-12 rounded bg-zinc-800 px-4 py-1 text-center">
        <strong className="block text-sm uppercase tracking-wide">
          {columnTitle}
        </strong>
      </div>
    )}
    <ul className={`flex flex-col items-center gap-4 md:items-start`}>
      {attributes.map((attribute, index) => (
        <li key={index}>
          <strong className="mr-1 inline">{attribute.title} </strong>{' '}
          {attribute.value}
        </li>
      ))}
    </ul>
  </div>
)
