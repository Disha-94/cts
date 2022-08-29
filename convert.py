import os
from os import listdir
from os.path import isfile, join
mypath = "../../Data_Cluster/retile"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
# print(onlyfiles)

file = open("execute.txt", "w")

count = 0
for i in onlyfiles:
    filepath = "'../../Data_Cluster/retile/" + i + "'"
    newpath = "'../../Data_Cluster/new_json/json_" + str(count) + ".json'"

    func1 = "te=raster(" + filepath + ")"
    func2 = "te1=rasterToPolygons(te, na.rm=TRUE, dissolve=FALSE)"
    func3 = "te2=geojson_json(te1)"
    func4 = "geojson_write(te2, file="+ newpath + ")"
    # print(filepath)
    file.write("\n" + func1 + "\n"+ func2 + "\n"+ func3 + "\n"+ func4 + "\n")
    count+=1

    


