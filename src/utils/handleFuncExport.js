
import { Excel } from "antd-table-saveas-excel";
import html2canvas from 'html2canvas';
import { message } from 'antd';
const exportTableAntdToExcel = (columns, dataSource, name) => {
    if (columns && dataSource && name) {
        const excel = new Excel();
        excel
            .addSheet(`sheet`)
            .addColumns(columns)
            .addDataSource(dataSource, {
                str2Percent: true,
            })
            .saveAs(`${name}.xlsx`);
    }
};
const exportTableAntdToImage = (divId, name) => {
    if (divId && name) {
        const divToCapture = document.getElementById(divId);
        html2canvas(divToCapture, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const downloadLink = document.createElement('a');
            downloadLink.href = imgData;
            downloadLink.download = `${name}.jpeg`;
            downloadLink.click();
        }).catch((error) => {
            message.error('Thất bại', error);
        });
    }
}
export {
    exportTableAntdToExcel, exportTableAntdToImage
}