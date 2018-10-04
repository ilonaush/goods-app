/**
 * PDFList component
 * renders list of actual items and creates PDF from it
 * creation date: 26/09/18
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import {bindActionCreators} from "redux";
import { Link } from "react-router-dom";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import CloudButton from '../../components/cloud-button/cloud-button';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

class  PDFList extends Component {
    constructor() {
        super();

        this.makePdf = this.makePdf.bind(this);
        this.generateRows = this.generateRows.bind(this);
        this.generateTables = this.generateTables.bind(this);
    }


    /**
     * creates tables in PDF according to each category
     * @param docDef {object}
     */
    generateTables (docDef) {
        let categoryArr = Object.keys(this.props.goods);
        for (let i = 0; i < categoryArr.length; i++) {
            docDef.content.push({
                text: `${categoryArr[i]}`, style: 'tableHeader'
            });
            docDef.content.push({
                style: 'table',
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

    /**
     * initializes PDF, sets its initial content ans style
     */
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
                tableBody: {
                    margin: [10, 10, 10, 10],
                    alignment: 'center'
                },
                tableHeader: {
                    bold: true,
                    fontSize: 16,
                    color: 'black',
                    alignment: 'center',
                    margin: [10, 0, 0, 0]
                }
            },
        };
        this.generateTables(docDefinition);
        pdfMake.createPdf(docDefinition).open();
    }

    /**
     * creates content of each table according to category
     * @param category [string]
     * @returns {array}  additional content to PDF file
     */
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
                    <div>
                        <div className='title'>
                            <div className="cloud">
                                <div className="cloudshadow">
                                </div>
                            </div>
                            <h1 className='head-title'>Price List</h1>
                        </div>
                    </div>
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
                    {this.props.sum.generalSum ? <h3 className='itemList'>General Sum: {this.props.sum.generalSum}</h3> : null}
                    <div className='buttons'>
                        {Object.keys(this.props.goods).length > 0 ?
                            <CloudButton onClick={this.makePdf}>make PDF</CloudButton>:
                            <div className='emptyMessage'><h3>Empty list. Add something to a list</h3></div>}
                        <CloudButton onClick={null}><Link to='/' className='no-decoration'>Back home</Link></CloudButton>
                    </div>
                </div>
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
