/* eslint-disable @typescript-eslint/no-explicit-any */
type SchemaProps = {
    schemas?: any | any[];
};

export default function Schema({ schemas }: SchemaProps) {
    if (!schemas) return null;

    // Always normalize to array
    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

    return (
        <>
            {schemaArray.map((schema, index) => {
                if (!schema) return null;

                return (
                    <script
                        key={index}
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(schema),
                        }}
                    />
                );
            })}
        </>
    );
}