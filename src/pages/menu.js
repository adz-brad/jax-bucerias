import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import MenuItem from '../components/menuItem'

const Menu = ({ data }) => {

  const menu = data.menu.categories

  const [ category, setCategory ] = useState(menu ? menu[0] : null)
  const [ subCategory, setSubCategory ] = useState(category ? category.subcategories ? category.subcategories[0] : null : null)

  useEffect(() => {
    setSubCategory(category ? category.subcategories ? category.subcategories[0] : null : null)
  }, [ category ])

  return(

    <div className="flex flex-col w-full md:my-4 px-4">
      {menu ?
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 mb-1 md:mb-2">
          {menu.map((item, i) => {
            return(
              <li 
                key={i}
                className="w-full"
              >
                <button 
                  onClick={() => setCategory(item)}
                  className={`${category === item ? 'bg-red-600' : 'bg-neutral-100 text-zinc-900'} text-2xl md:text-3xl headers uppercase w-full my-1 md:my-0  rounded-sm shadow-md py-2 md:py-4`}
                >
                  {item.title.en}
                </button>
              </li>
            )
          })}
        </ul>
      : null}
      { category ?
            category.subcategories.length > 0 ?
            <ul className="grid grid-cols-1 lg:grid-cols-5 lg:gap-2">
              {category.subcategories.map((item, i) => {
                return(
                  <li 
                    key={i}
                    className="w-full flex grow"
                  >
                    <button
                      onClick={() => setSubCategory(item)}
                      className={`${subCategory === item ? 'bg-red-600' : 'bg-neutral-100 text-zinc-900'} w-full mt-1 p-2 rounded-sm shadow-sm uppercase font-semibold`}
                    >
                      {item.title.en}
                    </button>
                  </li>
            )})}
            </ul>
            : category.items.length > 0 ?
              <ul className="bg-zinc-900/60 grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item, i) => {
                  return <MenuItem key={i} _key={i} item={item} />
                })}
              </ul> 
            : null 
      : null }
      { subCategory ?
        <>
        <ul className="bg-zinc-900/60">
          {subCategory.subcategories.length > 0 ?
          subCategory.subcategories.map((item, i) => {
            return(
              <li key={i} className="mb-8">
                <h3 className="headers text-4xl mt-4 text-red-500">{item.title.en}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 xl:grid-cols-4">
                  {item.items ?
                    item.items.map((item, i) => {
                      return <MenuItem key={i} _key={i} item={item} />
                    })
                  : null}
                </ul>
              </li>
            )
          })
        
          : subCategory.items.length > 0 ?
            subCategory.items.map((item, i) => {
              return <div className="my-4"><MenuItem key={i} _key={i} item={item} /></div>
            })
          : null }
        </ul>
        </>
      : null }
    </div>
    
  )
}

export default Menu

export const Head = () => {
  return(
    <>
      <title>Food & Drink Menu - Jax Bucerias Nayarit</title>
      <meta name="description" content="Jax Bar & Grill in Bucerias, Nayarit, Mexico is home to the best live music in Banderas Bay. With bands on the stage every day of the week, the party never stops at Jax, your #1 destination for entertainment and nightlife in Riviera Nayarit." />
      <meta name="keywords" content="Jax, Bucerias, Nayarit, Nightlife, Live Music, Live Bands, Trivia, Events, Party, Bar, Entertainment, Centro" />
    </>
  )
}

export const pageQuery = graphql`
query {
  menu: allCategory {
    categories: nodes {
      title {
        en
        sp
      }
      items: childrenItem {
        title {
          en
          sp
        }
        price
        description {
          en
          sp
        }
      }
      subcategories: childrenSubcategory {
        title {
          en
          sp
        }
        subcategories: childrenSubcategory {
          title {
            en
            sp
          }
          items: childrenItem {
            title {
              en
              sp
            }
            price
            description {
              en
              sp
            }
          }
        }
      }
    }
  }
}

`