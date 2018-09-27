import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class  PDFList extends Component {
    constructor() {
        super();

        this.makePdf = this.makePdf.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.generateTables = this.generateTables.bind(this);
    }

    generateTables (docDef) {
        let categoryArr = Object.keys(this.props.goods);
        for (let i = 0; i < categoryArr.length; i++) {
            docDef.content.push({
                text: `${categoryArr[i]}`, style: 'tableHeader'
            });
            docDef.content.push({
                style: 'tableExample',
                table: {
                    widths: '*',
                    body: this.generateRows(categoryArr[i])
                }
            });
        }
        docDef.content.push({
            text: `General Sum: ${this.props.sum.generalSum} `, style: 'subheader'
        })
    }

    makePdf() {
        let docDefinition = {
            content: [
                {
                    text: 'Price List', style: 'header'
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center'
                },
                tableExample: {
                    margin: [5, 5, 5, 5],
                    alignment: 'center'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 16,
                    color: 'black',
                    alignment: 'center'
            }
        },
    };
    this.generateTables(docDefinition);
    pdfMake.createPdf(docDefinition).open();
    }

    generateRows(category) {
        let mainArray = [['Name', 'Price']];
        for (let i = 0; i < this.props.goods[category].length; i++) {
            let currentArray = [];
            currentArray.push(this.props.goods[category][i].name);
            currentArray.push(this.props.goods[category][i].price);
            mainArray.push(currentArray);
        }
        mainArray.push(['Total Sum', this.props.sum.categoriesSum[category]]);
        return mainArray;
    }

    render () {
        return (
            <div>
                <div className='pdfCanvas'>
                    <h1 className='head-title'>Price List</h1>
                    {Object.keys(this.props.goods).map((category) => {
                        return (
                            <div className='itemList'>
                                <h3>Category: {category}</h3>
                                <div className='listTable'>
                                    <div className="name-col">Name</div>
                                    <div className="price-col">Price</div>

                                </div>
                                {this.props.goods[category].map ((item) => {
                                    return (
                                        <div className='item'>
                                            <div className="name">{item.name}
                                            </div>
                                            <div className="price">{item.price}</div>
                                        </div>
                                    )
                                }) }
                            </div>
                        )})}
                    {this.props.sum.generalSum ? <h3>General Sum: {this.props.sum.generalSum}</h3> : null}
                </div>
                {Object.keys(this.props.goods).length > 0 ? <button onClick={this.makePdf}>Create PDF</button> :
                    <div className='emptyMessage'><h3>Empty list. Add something to a list</h3></div>}
                <div><button><Link to="/">Back home</Link></button></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        goods: state.goods,
        sum: state.sum
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PDFList)
