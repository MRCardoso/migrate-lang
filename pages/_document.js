import Document, { Html, Head, Main, NextScript } from 'next/document'
import {getLanguage} from '../services/storage'

const lang = getLanguage().toLowerCase()

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang={lang}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument