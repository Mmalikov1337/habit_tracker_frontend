export function createPages(
	totalPage: number,
	currentPage: number,
	display: number,
	offsetOn: number
) {
	const pages = [];
	if (totalPage > display) {
		if (currentPage > offsetOn) {
			for (let i = currentPage - (offsetOn - 1); i <= currentPage + offsetOn; i++) {
				pages.push(i);
				if (i == totalPage) break;
			}
		} else {
			for (let i = 1; i <= display; i++) {
				pages.push(i);
				if (i == totalPage) break;
			}
		}
	} else {
		for (let i = 1; i <= totalPage; i++) {
			pages.push(i);
		}
	}
	return pages;
}