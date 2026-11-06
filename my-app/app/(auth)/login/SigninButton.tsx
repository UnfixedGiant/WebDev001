const SigninButton = ({
    text,
    style,
    callback,
    formAction
}: {
    text: string
    style: string
    callback?: () => void
    formAction?: any
}) => {
    return (
        <div className="form-control mt-6">
            <button
                type="submit"
                formAction={formAction}
                className={style}
                onClick={callback}
            >
                {text}
            </button>
        </div>
    )
}

export default SigninButton