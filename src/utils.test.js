/**
 * @jest-environment jsdom
 */
import { make2DArray } from './utils/utils'

test('array with 3 columns and 10 rows', () => {
	const array = [
		new Array(10),
		new Array(10),
		new Array(10)
	]
	expect(make2DArray(3, 10)).toEqual(array);
});