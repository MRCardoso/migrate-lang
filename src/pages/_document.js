import Document, { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/Footer'
import {getLanguage} from '../services/storage'
import { list } from "../services/firebase/entities/links"
import fs from 'fs'
const lang = getLanguage().toLowerCase()

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		const linkValues = await list()
		const data = fs.readFileSync('./package.json', {encoding:'utf8', flag:'r'})
		return { ...initialProps, appVersion: JSON.parse(data).version, linkValues: linkValues.items }
	}

	render() {
		return (
			<Html lang={lang}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
				<Footer appVersion={this.props.appVersion} links={this.props.linkValues} />
			</Html>
		)
	}
}

export default MyDocument